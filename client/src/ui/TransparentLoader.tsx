function TransparentLoader() {
  return (
    <div className="absolute top-0 flex h-full w-full items-center justify-center bg-white bg-opacity-75">
      <div className="loader"></div>
    </div>
  );
}

export default TransparentLoader;
