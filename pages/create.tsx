import { useAuthenticator } from '@aws-amplify/ui-react';
import type { NextPage } from 'next';
import React from 'react';
import AuthLayout from '../src/layouts/AuthLayout';

const CreatePage: NextPage = () => {
  const { user } = useAuthenticator((context) => [context.user]);
  return (
    <AuthLayout>
      <div></div>
    </AuthLayout>
  );
};

export default CreatePage;
