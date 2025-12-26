export default function Error({
  nameOfError,
  descriptionOfError,
}: {
  nameOfError: string;
  descriptionOfError: string;
}) {
  return (
    <>
      <div className="m-2 max-w-6xl mx-auto text-center">
        <div>
          <h1>Error</h1>
        </div>
        <div>
          <h3>{nameOfError}</h3>
        </div>
        <div>
          <h4>{descriptionOfError}</h4>
        </div>
      </div>
    </>
  );
}
