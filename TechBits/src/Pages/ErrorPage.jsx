import "../styles/errorPage.css";
export default function ErrorPage() {
  return (
    <>
      <div className="error">
        <h1>Error 404 : Page Not Found</h1>
        <h3>Oops we were not able to find the page you're looking for :( </h3>
        <p>
          back to <a href="/">Home</a>
        </p>
      </div>
    </>
  );
}
