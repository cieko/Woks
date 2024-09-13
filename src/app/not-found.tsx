// app/not-found.tsx
import Link from 'next/link';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">
        <p>Go back to Home</p>
      </Link>
    </div>
  );
};

export default NotFound;
