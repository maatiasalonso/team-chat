'use client';
import {
  Accordion,
  AccordionItem,
  Card,
  CardBody,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';

export const TestUserCredentials = () => {
  const testUsers = [
    { username: 'alex_doe', password: 'password' },
    { username: 'emily_doe', password: 'password' },
    { username: 'david_doe', password: 'password' },
  ];

  return (
    <Card className='w-full max-w-sm bg-white dark:bg-zinc-900'>
      <CardHeader className='flex flex-col'>
        <h3 className='text-xl font-bold'>Test User Credentials</h3>
        <p>Use these accounts for testing purposes only</p>
      </CardHeader>
      <CardBody>
        <Accordion variant='splitted'>
          <AccordionItem
            key='1'
            aria-label='List of users'
            title='List of users'
          >
            <Table>
              <TableHeader>
                <TableColumn>Username</TableColumn>
                <TableColumn>Password</TableColumn>
              </TableHeader>
              <TableBody>
                {testUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell className='font-medium'>
                      {user.username}
                    </TableCell>
                    <TableCell>{user.password}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionItem>
        </Accordion>
      </CardBody>
    </Card>
  );
};
