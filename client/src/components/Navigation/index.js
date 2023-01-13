import React, { useEffect, useState } from "react";

import style from "./navigation.module.css";

//ovo promeni
const menuListValues = {
  mainMenu: {
    previus: null,
    children: {
      lapTop: {
        text: "LapTop",
        children: {
          working: {
            text: "Working",
            children: {
              hp: {
                text: "HP",
                navigateTo: "/nekiURL",
              },
              apple: {
                text: "Apple",
                navigateTo: "/nekiURL",
              },
            },
          },
          gaming: {
            text: "Gamin",
            navigateTo: "/nekiURL",
          },
        },
      },
      pc: {
        text: "PC",
        children: {
          working: {
            text: "Working",
            navigateTo: "/nekiURL",
          },
          videoEdditing: {
            text: "Video Edditin",
            navigateTo: "/nekiURL",
          },
          gaming: {
            text: "Gamin",
            navigateTo: "/nekiURL",
          },
        },
      },
      homeAppliances: {
        text: "Home Appliances",
        children: {
          masinaZaSudove: {
            text: "Masina za sudove",
            navigateTo: "/nekiURL",
          },
          mikser: {
            text: "Mikser",
            navigateTo: "/nekiURL",
          },
        },
      },
      tv: {
        text: "TV",
        children: {
          oled: {
            text: "OLED",
            navigateTo: "/nekiURL",
          },
          bioskop: {
            text: "Bioskop",
            navigateTo: "/nekiURL",
          },
        },
      },
    },
  },
};

export const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuList, setMenuList] = useState(menuListValues.mainMenu);
  const [previusState, setPreviusState] = useState([]);

  const showMenuClick = () => {
    setShowMenu(!showMenu);
    setMenuList(menuListValues.mainMenu);
    setPreviusState([]);
  };

  const menuOptionClick = (e, name) => {
    console.log(name, 'ovo je ime ')
    showMenu || setShowMenu(true);
    setPreviusState(previusState.concat(menuList));
    menuList.children[name] && setMenuList(menuList.children[name]);
    menuList.children[name].navigateTo && console.log("redirect ");

    e.stopPropagation();
  };

  const goToPreviusState = (e) => {
    console.log(previusState, "previus state");
    previusState.length && setMenuList(previusState.pop());
    e.stopPropagation();
  };

  /*

    kad se pojavljuje meni
      mobile: 
      na dugme se pojavljuje 
      
      pc:
      na kikom od nekih menija
  
      
    // zajednicki kontejner 

    kad kliknes meni  ( moda ima ima state )
      mobile
        ide u sub tree
          do navigacije

      pc
        jedno bolje sa svim informacijama

    
     kad se klikne sa strane se gasi
     ili na redirekciji



  */

  return (
    <>
      <nav className={style.container}>
        <div className={style.menuLeft}>
          {/* -------- Mobile --------- */}
          <div className={style.mobileView}>
            <div className={style.menuButtonContainer} onClick={showMenuClick}>
              <div className={style.menuButtonLine}></div>
              <div className={style.menuButtonLine}></div>
              <div className={style.menuButtonLine}></div>
            </div>
          </div>
          <div className={style.deskTopView}>
              {Object.keys(menuListValues.mainMenu.children).map((name) => (
                <div
                  className={style.menuItem}
                  onClick={(e) => menuOptionClick(e, name)}
                >
                  {menuListValues.mainMenu.children[name].text}
                </div>
              ))}
          </div>
        </div>
        <div className={style.logo}>E-COMERCE</div>
        <div className={style.menuRight}>kolica i ostalo</div>
      </nav>
      {/* ------- navigation options */}
      {showMenu && (
        <div
          className={style.navigationOptionsContainer}
          onClick={showMenuClick}
        >
          <div
            key={previusState.length}
            className={style.navigationOptions}
            onClick={(e) => menuOptionClick(e)}
          >
            {previusState.length !== 0 ? (
              <div
                className={style.navigationOptionBack}
                onClick={(e) => goToPreviusState(e)}
              >
                <div className={style.menuLeft}> ← </div>
                <div className={style.textCenter}> {menuList.text} </div>
                <div className={style.menuRight}></div>
              </div>
            ) : null}
            <div className={style.slideInRight}>
              {menuList.children &&
                Object.keys(menuList.children).map((name) => (
                  <div
                    className={style.navigationOptionItem}
                    onClick={(e) => menuOptionClick(e, name)}
                  >
                    {menuList.children[name].text}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
