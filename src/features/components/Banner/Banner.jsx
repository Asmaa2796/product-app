import { Link } from "react-router-dom";

const Banner = ({currentPage,bg,sub,to}) => {
    return (
      <div className="banner py-5" style={{ backgroundImage: bg }}>
        <div className="container">
          <ul className="list-unstyled p-0">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>/</li>
            {sub && (
              <>
                <li>
                    <Link to={to}>{sub}</Link>
                </li>
                <li>/</li>
              </>
            )}
            <li>{currentPage}</li>
          </ul>
        </div>
      </div>
    );
}

export default Banner;