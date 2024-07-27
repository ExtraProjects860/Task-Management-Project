import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import Style from './Footer.module.css'; // Certifique-se de que o caminho está correto

function Footer() {
  return (
    <MDBFooter className={Style.footer}>
      <div className='text-center p-3'>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-light' href='https://mdbootstrap.com/'>
          NotedFlow
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
