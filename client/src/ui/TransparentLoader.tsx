function TransparentLoader() {
  return (
    <div className="fixed left-0 top-0 z-[99999] flex h-full w-full items-center justify-center bg-white bg-opacity-75">
      <div className="loader"></div>
    </div>
  );
}

export default TransparentLoader;
