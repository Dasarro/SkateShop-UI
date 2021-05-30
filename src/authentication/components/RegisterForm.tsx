import React, { useState } from 'react';
import {
    Flex,
    Button,
    Input,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Checkbox
} from "@chakra-ui/react";
import { useForm } from 'react-hook-form';
import { register as appRegister } from '../api/authAPI';
import { useHistory } from 'react-router-dom';
import { Routes } from '../../routing/routes';
import { useAuth } from "../context/AuthProvider";

interface Inputs {
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    name: string,
    surname: string,
    address: string,
    postalCode: string,
    checked: boolean
}

export const RegisterForm: React.FC = () => {
    const history = useHistory();
    const { 
        register,
        handleSubmit,
        formState: { isSubmitting, errors }
    } = useForm<Inputs>();
    const { login } = useAuth();
    const [registerError, setRegisterError] = useState<string | null>(null);
    const onSubmit = async ({email, username, password, confirmPassword, name, surname, address, postalCode}: Inputs) => {
        if (password !== confirmPassword) {
            setRegisterError('Passwords are not the same!');
        }
        else {
            setRegisterError(null);
            await appRegister(email, username, password, name, surname, address, postalCode)
                    .then(success => {
                        if (success) {
                            login(username, password);
                        }
                        else setRegisterError('User already exists!');
                    });
        }
    }

    return (
        <form style={{width: '100%'}} onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.username} isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                    type='text' 
                    placeholder='Enter username'
                    borderRadius={14}
                    bgColor='white'
                    {...register('username', { 
                                                required: 'This field is required!',
                                                validate: username => !/[^a-zA-Z0-9]/.test(username)
                                                        || 'Username must include only letters and digits!'
                                             }
                                )
                    }
                    />
                <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt={3} isInvalid={!!errors.email} isRequired>
                <FormLabel>Email address</FormLabel>
                <Input 
                    type='email' 
                    placeholder='Enter email address'
                    borderRadius={14}
                    bgColor='white'
                    {...register('email', { required: 'This field is required!' })} />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt={3} isInvalid={!!errors.name} isRequired>
                <FormLabel>Name</FormLabel>
                <Input 
                    type='text' 
                    placeholder='Enter your name'
                    borderRadius={14}
                    bgColor='white'
                    {...register('name', { required: 'This field is required!' })} />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt={3} isInvalid={!!errors.surname} isRequired>
                <FormLabel>Surname</FormLabel>
                <Input 
                    type='text' 
                    placeholder='Enter your surname'
                    borderRadius={14}
                    bgColor='white'
                    {...register('surname', { required: 'This field is required!' })} />
                <FormErrorMessage>{errors.surname?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt={3} isInvalid={!!errors.address} isRequired>
                <FormLabel>Address</FormLabel>
                <Input 
                    type='text' 
                    placeholder='Enter address'
                    borderRadius={14}
                    bgColor='white'
                    {...register('address', { required: 'This field is required!' })} />
                <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt={3} isInvalid={!!errors.postalCode} isRequired>
                <FormLabel>Postal code</FormLabel>
                <Input 
                    type='text' 
                    placeholder='Enter postal code'
                    borderRadius={14}
                    bgColor='white'
                    {...register('postalCode', { required: 'This field is required!',
                                                 validate: postalCode => (/^\d{2}-\d{3}$/.test(postalCode) ||
                                                                          'Invalid format of the postal code!')
                    })} />
                <FormErrorMessage>{errors.postalCode?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt={3} isInvalid={!!errors.password} isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                    type='password' 
                    placeholder='Enter password'
                    borderRadius={14}
                    bgColor='white'
                    {...register('password', {  
                                                required: 'This field is required!',
                                                minLength: {
                                                    value: 6,
                                                    message: 'Password must have at least 6 characters!'
                                                },
                                                validate: {
                                                    digit: password => /[0-9]/.test(password)
                                                        || 'Password must include at least one digit!',
                                                    lowercase: password => /[a-z]/.test(password)
                                                        || 'Password must include at least one lowercase letter!',
                                                    uppercase: password => /[A-Z]/.test(password)
                                                        || 'Password must include at least one uppercase letter!',
                                                    nonAlphaNumeric: password => /[^a-zA-Z0-9]/.test(password)
                                                        || 'Password must include at least one non-alphanumeric character!'
                                                }
                                             }
                                )
                    }/>
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mt={3} isInvalid={!!errors.confirmPassword} isRequired>
                <FormLabel>Confirm password</FormLabel>
                <Input
                    type='password' 
                    placeholder='Enter password again'
                    borderRadius={14}
                    bgColor='white'
                    {...register('confirmPassword', { required: 'This field is required!' })}/>
                <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!registerError}>
                <FormErrorMessage mt={3}>{registerError}</FormErrorMessage>
            </FormControl>
            <FormControl my={6} isInvalid={!!errors.checked} isRequired>
                <Checkbox
                    {...register('checked', { required: 'This field is required!' })}>I accept the policy and terms</Checkbox>
                <FormErrorMessage>{errors.checked?.message}</FormErrorMessage>
            </FormControl>
            <Flex justifyContent='space-between'>
                <Button
                  width='45%'
                  border='1px'
                  borderRadius={14}
                  bgColor='#574240'
                  color='white'
                  onClick={() => history.push(Routes.LOGIN)}
                  _hover={{ transform: 'scale(1.02)'}}
                  _active={{ transform: 'scale(1.02)'}}>Log In</Button>
                <Button
                    type='submit'
                    width='45%'
                    borderRadius={14}
                    isLoading={isSubmitting}
                    bgColor='#574240'
                    color='white'
                    _hover={{ transform: 'scale(1.02)'}}
                    _active={{ transform: 'scale(1.02)'}}>Sign Up</Button>
            </Flex>
        </form>
    );
}