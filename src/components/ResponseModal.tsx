export const ResponseModal: React.FC<{ isResponsePending: boolean; isError: boolean; isSuccess: boolean }> = ({
  isResponsePending,
  isError,
  isSuccess,
}) => {
  return (
    <>
      {isResponsePending ? (
        <div>Wysyłanie danych...</div>
      ) : (
        <>
          {isError ? <div>Wystąpił Błąd</div> : null} {isSuccess ? <div>Dane zostały zapisane</div> : null}
        </>
      )}
    </>
  );
};
