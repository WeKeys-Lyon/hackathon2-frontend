import styles from '../styles/Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {Navigate} from "react-router-dom";

function Menu() {

    return (<>
        <div>Logo</div>
        <div>
            <div>
                <div>Avatar Img</div>
                <div>
                    <div>Firstname</div>
                    <div>username</div>
                </div>
            </div>
        </div>
    </>)

};

export default Menu;