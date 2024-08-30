import { Sidebar } from '@/components/navigation/sidebar';

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  console.log('MainLayout');
  return (
    <div className='w-full h-full'>
      <div className='hidden md:flex h-full w-[72px] z-50 flex-col fixed inset-y-0 left-0'>
        <Sidebar />
      </div>
      <main className='h-full md:pl-[72px]'>{children}</main>
    </div>
  );
};

export default MainLayout;
