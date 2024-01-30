import React from 'react'
import houseImage from '../images/Houses.png'; 
import dogImage from '../images/DogImage.png'; 

function Landing() {
  return (
    <div style={{width: '100%', height: '100%', position: 'relative', background: '#E6E6DD'}}>
      <div style={{width: '1110px', height: '490px', left: '103px', top: '100px', position: 'absolute'}}>
        <div style={{width: '537px', height: '360px', left: '0px', top: '20px', position: 'absolute'}}>
          <div>
            <span style={{display: 'block', color: 'black', fontSize: '90px', fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>Subleases and short-term housing </span>
            <span style={{display: 'block', color: '#AF8C53', fontSize: '90px', fontFamily: 'Josefin Sans', fontStyle: 'italic', fontWeight: '700', wordWrap: 'break-word'}}>in a snap</span>
          </div>
        </div>
        <div style={{width: '225px', height: '75px', left: '0px', top: '450px', position: 'absolute'}}>
          <button style={{width: '225px', height: '75px', left: '0px', top: '0px', position: 'absolute', textAlign: 'center', color: 'black', fontSize: '30px', fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word', borderRadius: '37.5px'}}>Find a Stay</button>
        </div>
        <div style={{width: '225px', height: '75px', left: '269px', top: '450px', position: 'absolute'}}>
          <button style={{width: '225px', height: '75px', left: '0px', top: '0px', position: 'absolute', textAlign: 'center', color:'clear', fontSize: '30px', fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word', borderRadius: '37.5px'}}>List a Stay</button>
        </div>
        <img style={{width: '564px', height: '490px', left: '546px', top: '0px', position: 'absolute'}} src={houseImage} alt="House Image" />
      </div>
      <div style={{width: '1380px', height: '849px',left: '0px', top: '842px', position: 'absolute'}}>
        <div style={{width: '1380px', height: '715px', left: '0px', top: '134px', position: 'absolute', background: '#AF8C53'}}>
        </div>
        <div style={{width: '1380px', height: '193.99px', left: '0px', top: '0px', position: 'absolute'}}>
          <div style={{width: '1370px', height: '40px', left: '0px', top: '97px', position: 'absolute', background: '#AF8C53', borderRadius: '10px', border: '3px #2B2B2B solid'}}></div>
          <div style={{width: '1340px', height: '40px', left: '20px', top: '60px', position: 'absolute', background: '#AF8C53', borderRadius: '10px', border: '3px #2B2B2B solid'}}></div>
          <div style={{width: '1300px', height: '40px', left: '40px', top: '23px', position: 'absolute', background: '#AF8C53', borderRadius: '10px', border: '3px #2B2B2B solid'}}></div>
          <div style={{width: '200px', height: '30px', left: '0px', top: '181.31px', position: 'absolute', transform: 'rotate(-65deg)', transformOrigin: '0 0', background: '#2B2B2B', borderRadius: '10px', border: '3px #2B2B2B solid'}}></div>
          <div style={{width: '200px', height: '30px', left: '1300px', top: '0px', position: 'absolute', transform: 'rotate(65deg)', transformOrigin: '0 0', background: '#2B2B2B', borderRadius: '10px', border: '3px #2B2B2B solid'}}></div>
        </div>
        <div style={{width: '1030px', height: '430px', left: '125px', top: '277px', position: 'absolute'}}>
          <div style={{width: '1030px', height: '430px', left: '28px', top: '0px', position: 'absolute', background: 'black', borderRadius: '30px'}}></div>
          <div style={{width: '1015px', height: '415px', left: '30px', top: '0px', position: 'absolute', background: '#2B2B2B', borderRadius: '30px', border: '5px black solid'}}></div>
        </div>
        <div style={{width: '666px', left: '360px', top: '318px', position: 'absolute', color: '#E6E6DD', fontSize: '48px', fontFamily: 'Josefin Sans', fontStyle: 'italic', fontWeight: '700', wordWrap: 'break-word'}}>Welcome In, Enjoy Your Stay!</div>
        <div style={{width: '958px', left: '175px', top: '382px', position: 'absolute', color: '#E6E6DD', fontSize: '40px', fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>We aim to streamline and simplify the process of renting and subletting for college students by providing a platform tailored to meet student’s short-term accommodation needs. We aim to alleviate the stress associated with finding temporary housing solutions, so our users can focus on their education and enjoy their college experience.</div>
      </div>
      <div style={{width: '1380px', height: '845px', left: '0px', top: '1691px', position: 'absolute'}}>
        <div style={{width: '1380px', height: '845px', left: '0px', top: '0px', position: 'absolute', background: '#2B2B2B'}}></div>
        <img style={{width: '555px', height: '559px', left: '78px', top: '229px', position: 'absolute'}} src={dogImage} alt="Dog Image" />
        <div style={{width: '1079px', left: '113px', top: '99px', position: 'absolute', textAlign: 'right', color: '#E6E6DD', fontSize: '65px', fontFamily: 'Josefin Sans', fontWeight: '700', wordWrap: 'break-word'}}>Something something use this app yay slay whatever</div>
        <div style={{width: '508px', left: '685px', top: '300px', position: 'absolute', textAlign: 'right', color: '#E6E6DD', fontSize: '65px', fontFamily: 'Josefin Sans', fontWeight: '400', wordWrap: 'break-word'}}>fs hsdfohu fhsod sdh dudh fdhh dufho jhsdfou fh fh hd hhf diufh uds</div>
      </div>
    </div>
  );
}


export default Landing;