import Navbar from './Navbar';
// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="bg-gray-200 container mx-auto p-8">{children}</main>
    </>
  );
};
export default Layout;
