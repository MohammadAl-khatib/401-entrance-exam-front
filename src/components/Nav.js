import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withAuth0 } from "@auth0/auth0-react";

class Nav extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to = '/'>Home</Link></li>
                    <li><Link to = '/favs'>Favs</Link></li>
                </ul>
            </div>
        )
    }
}

export default withAuth0(Nav)
