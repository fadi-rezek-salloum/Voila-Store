import jwt, datetime

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed

from .serializers import CustomUserSerializer
from users.models import CustomUser

class RegisterUser(APIView):

    def post(self, request):

        serializer = CustomUserSerializer(data=request.data)

        try:
            CustomUser.objects.get(email=request.data.get('email'))
            return Response('Email already exists!', status=status.HTTP_409_CONFLICT)
        except:
            pass

        if serializer.is_valid():
            user = serializer.save()

            user.set_password(request.data.get('password'))

            user.save()

            json = serializer.data
            return Response(json, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginUser(APIView):
    
    def post(self, request):

        email = request.data['email']
        password = request.data['password']

        print(email, password)

        user = CustomUser.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('لم يتم العثور على المستخدم!')
        
        if not user.check_password(password):
            raise AuthenticationFailed('كلمة المرور خاطئة!')

        if user.is_staff:
            role = 'admin'
        else:
            role = 'normal'

        payload = {
            'id': user.id,
            'role': role,
            'full_name': user.firstname + ' ' + user.lastname,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=90),
            'iat': datetime.datetime.utcnow(),
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)

        response.data = {
            'jwt': token
        }
        return response

class LogoutUser(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }

        print(response.cookies)

        return response


class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = CustomUser.objects.filter(id=payload['id']).first()
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)