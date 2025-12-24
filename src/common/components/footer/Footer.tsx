const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} Your Shop. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <span className="hover:text-gray-700 cursor-pointer">
              Privacy
            </span>
            <span className="hover:text-gray-700 cursor-pointer">
              Terms
            </span>
            <span className="hover:text-gray-700 cursor-pointer">
              Contact
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
