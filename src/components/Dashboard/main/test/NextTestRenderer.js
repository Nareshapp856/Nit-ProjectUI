function NextTestRenderer() {
  return (
    <div className="w-full h-full flex flex-col gap-y-4 overflow-y-auto">
      <article className="px-4 mt-4">
        <h2 className="px-2">This is a test</h2>
        <small className="px-4">
          text is on <b>02-02-2000</b>
        </small>
        <p className="px-4">
          This is test description this is a placeholder descriptionThis is test
          description this is a placeholder descriptionThis
        </p>
      </article>
    </div>
  );
}

export default NextTestRenderer;
