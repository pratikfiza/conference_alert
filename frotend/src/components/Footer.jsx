
export default function Footer() {
  return (
    <footer className="bg-gray-900 py-8 flex items-center justify-center">
      <div>
        <p className="text-gray-400 text-center ">
          &copy; {new Date().getFullYear()} All Rights Reserved. <a className="text-blue-400" href="/">Conferencealerts.org</a>
        </p>
      </div>
    </footer>
  );
}