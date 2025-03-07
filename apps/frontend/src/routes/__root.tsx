import { Link, Outlet, createRootRoute } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <header className='bg-primary-700 border-comic border-secondary sticky top-0 z-10 [grid-area:header] border-x-0 border-t-0 p-2 flex gap-2 text-lg'>
        <Link
          to='/'
          activeProps={{
            className: 'font-bold',
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>{' '}
        <Link
          to='/about'
          activeProps={{
            className: 'font-bold',
          }}
        >
          About
        </Link>
      </header>
      <main className='[grid-area:main-content] grow max-w-7xl w-full justify-self-center p-2'>
        <Outlet />
      </main>
      <footer></footer>
      <TanStackRouterDevtools position='bottom-right' />
    </>
  );
}
