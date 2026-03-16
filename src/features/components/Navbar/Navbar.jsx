import { Link, useNavigate } from "react-router-dom";
import { IconMenu3, IconLogout, IconLogin, IconHome } from '@tabler/icons-react';
import { toast } from "react-toastify";

const Navbar = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        toast.success("Logout successfully");
        navigate("/");
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg shadow-sm fixed-top">
                <div className="container">
                    <Link className="navbar-brand d-flex align-items-center main-color" to="/"><IconHome size={21} /> Home</Link>
                    {token ?
                        <>
                            <div>
                                <span>Welcome!</span>
                                <button className="btn btn-danger fw-medium mx-3" onClick={logout}>Logout <IconLogout size={17} /></button>
                            </div>
                        </>
                        :
                        <Link className="text-secondary fw-medium mx-3" to="/login">Login <IconLogin size={17} /></Link>
                    }
                </div>
            </nav>
        </>
    );
}

export default Navbar;