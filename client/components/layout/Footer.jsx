export default function Footer() {
  return (
    <footer className="border-t border-gray-100 mt-20">
      <div className="max-w-6xl mx-auto  bottom-0  px-4 py-8 text-sm text-gray-400 flex items-center justify-between">
        <p>
          © {new Date().getFullYear()} ATS. Built with care, no AI shortcuts.
        </p>
      </div>
    </footer>
  );
}
