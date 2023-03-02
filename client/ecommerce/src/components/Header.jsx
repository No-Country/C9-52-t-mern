import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCompra } from "./AppProvider";
import Menu from "./Menu";
import MenuCarrito from "./MenuCarrito";


const Header = () => {

  const {productosIcono, setProductosIcono, itemsCarrito} = useCompra()

  const [menuVisible, setMenuVisible] = useState(false)
  const [menuCarritoVisible, setMenuCarritoVisible] = useState(false)

  useEffect(()=>{
    console.log(itemsCarrito)
    itemsCarrito.length > 0 ? setProductosIcono(itemsCarrito.reduce((acc, item) => acc + item.cantidad, 0)) : setProductosIcono(0)
  },[itemsCarrito])



  return (
    <header className="w-full">
      <div className="py-3 pt-5 px-3 flex justify-around gap-4 flex-col 
      bg-gradient-to-r from-violet-800 to-violet-600
      ">
        <div className="w-full flex flex-row justify-between items-center">
          {/* Icono hamburguerMenu */}
          <svg className="w-6 h-6 hover:cursor-pointer text-white" onClick={() => setMenuVisible(!menuVisible)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
          {/* Menu Hamburgues */}
          {menuVisible && <Menu menuVisible={menuVisible} setMenuVisible={setMenuVisible}/>}
          {menuCarritoVisible && <MenuCarrito setMenuCarritoVisible={setMenuCarritoVisible} menuCarritoVisible={menuCarritoVisible} />}
           {/* Logo */}
          
           <Link to={"/"}><svg width="129" height="24" viewBox="0 0 129 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.41733 9.19347H4.61426L5.59272 5.53809H17.5189L16.5404 9.19347H12.7373L10.245 18.4612H5.92503L8.41733 9.19347Z" fill="white"/><path d="M19.0147 5.53809H30.0363L29.0763 9.0827H22.3009L21.9501 10.3935H28.2639L27.4332 13.5135H21.1156L20.7279 14.9165H27.5956L26.6541 18.4612H15.5439L19.0147 5.53809Z" fill="white"/><path d="M35.9433 18.7389C35.0961 18.7491 34.2532 18.6149 33.451 18.342C32.7364 18.0999 32.0791 17.7134 31.52 17.2066C30.9806 16.7083 30.5533 16.1011 30.2664 15.4251C29.954 14.6803 29.7994 13.8788 29.8123 13.0713C29.8202 12.1438 29.9921 11.225 30.32 10.3574C30.665 9.42511 31.1886 8.56911 31.8615 7.83741C32.5899 7.05194 33.4689 6.42097 34.4461 5.98202C35.5971 5.47903 36.8439 5.23331 38.0997 5.26202C38.7536 5.25742 39.4045 5.35076 40.0307 5.53894C40.5887 5.70397 41.1158 5.9597 41.5907 6.29587C42.0429 6.6183 42.431 7.02211 42.7353 7.48664C43.0465 7.96038 43.2715 8.48537 43.4 9.03741L39.5433 10.7082C39.4454 10.2391 39.1836 9.8202 38.8049 9.52664C38.4324 9.26365 37.985 9.1277 37.5292 9.13895C37.0747 9.13326 36.6256 9.23778 36.2203 9.44356C35.8333 9.64015 35.4904 9.91338 35.2123 10.2466C34.6482 10.9338 34.3385 11.7945 34.3353 12.6836C34.3353 13.3974 34.5292 13.9451 34.9169 14.3266C35.1073 14.515 35.3338 14.6628 35.5829 14.7611C35.832 14.8595 36.0984 14.9064 36.3661 14.8989C36.8447 14.9064 37.3165 14.7853 37.7323 14.5482C38.1701 14.2866 38.5577 13.949 38.8769 13.5513L41.8677 15.9143C41.2174 16.7619 40.3934 17.4605 39.451 17.9636C38.4898 18.4805 37.3206 18.7389 35.9433 18.7389Z" fill="white"/><path d="M45.9668 5.53809H50.0098L52.9452 11.7042L54.6068 5.53809H58.8898L55.4191 18.4612H51.5772L48.5126 12.0365L46.7772 18.4612H42.4941L45.9668 5.53809Z" fill="white"/><path d="M65.1484 18.7196C64.2609 18.7327 63.3786 18.5825 62.5454 18.2766C61.7957 17.9977 61.1063 17.5778 60.5146 17.0396C59.9511 16.5226 59.5016 15.8939 59.1946 15.1935C58.8779 14.4657 58.7175 13.6795 58.7238 12.8858C58.7218 11.8994 58.9196 10.9228 59.3054 10.015C59.6803 9.10708 60.2219 8.27739 60.9023 7.56886C61.5899 6.86388 62.4082 6.29953 63.3115 5.90732C64.2628 5.4908 65.2915 5.28004 66.33 5.28886C67.2169 5.27589 68.0986 5.42608 68.9312 5.73194C69.6811 6.01035 70.3705 6.43027 70.962 6.96886C71.5254 7.48589 71.975 8.11463 72.282 8.81501C72.5987 9.54281 72.7591 10.329 72.7527 11.1227C72.7548 12.1091 72.557 13.0857 72.1712 13.9935C71.7958 14.898 71.2549 15.7245 70.5761 16.4304C69.8892 17.1362 69.0707 17.7006 68.1669 18.0919C67.2163 18.5118 66.1876 18.7257 65.1484 18.7196ZM65.4438 14.9166C65.8725 14.9232 66.2956 14.8182 66.6715 14.6119C67.0299 14.4128 67.3464 14.1464 67.6038 13.8273C67.8653 13.5017 68.0683 13.1331 68.2038 12.7381C68.3431 12.3469 68.4149 11.9349 68.4161 11.5196C68.4195 11.193 68.3664 10.8682 68.2592 10.5596C68.1604 10.2742 68.0067 10.0108 67.8069 9.78425C67.6013 9.55611 67.3452 9.37911 67.0592 9.26732C66.733 9.13927 66.3849 9.07655 66.0346 9.08271C65.6059 9.07622 65.1828 9.18119 64.8069 9.38732C64.4485 9.58645 64.132 9.85286 63.8746 10.1719C63.6131 10.4976 63.4101 10.8661 63.2746 11.2612C63.1353 11.6524 63.0635 12.0644 63.0623 12.4796C63.0598 12.8062 63.1129 13.1308 63.2192 13.4396C63.318 13.7251 63.4717 13.9885 63.6715 14.215C63.8754 14.4409 64.1279 14.6177 64.41 14.7319C64.7389 14.8615 65.0904 14.9242 65.4438 14.9166Z" fill="white"/><path d="M79.6517 18.3788C78.7229 18.3929 77.8005 18.2228 76.9378 17.8785C76.0804 17.5105 75.2905 17.002 74.6006 16.3739L75.208 15.6742C75.5302 15.9769 75.8745 16.2552 76.2381 16.5068C76.5665 16.7346 76.9179 16.927 77.2867 17.0809C77.6503 17.232 78.0282 17.3458 78.4147 17.4206C78.8407 17.5013 79.2735 17.5402 79.707 17.5369C80.1448 17.5424 80.5807 17.4801 80.9994 17.3523C81.3627 17.2429 81.7027 17.067 82.0018 16.8335C82.2705 16.6199 82.4902 16.3511 82.6461 16.0452C82.802 15.7375 82.8818 15.3969 82.8787 15.052V15.0151C82.8839 14.7098 82.8326 14.4063 82.7274 14.1197C82.6098 13.8359 82.4186 13.5886 82.1735 13.4034C81.8439 13.1557 81.4785 12.9596 81.0898 12.8219C80.5187 12.6156 79.9314 12.4569 79.3341 12.3474C78.6757 12.2162 78.0292 12.031 77.4012 11.7935C76.926 11.6189 76.4817 11.3696 76.0849 11.0551C75.7619 10.7955 75.5082 10.46 75.3464 10.0785C75.1848 9.67423 75.1058 9.24174 75.1138 8.80647V8.77139C75.1112 8.32253 75.2156 7.87951 75.4184 7.47909C75.6241 7.07549 75.9107 6.71854 76.2603 6.43047C76.6372 6.12072 77.0685 5.88405 77.5323 5.73263C78.0519 5.56011 78.5965 5.47526 79.144 5.48155C79.945 5.46161 80.7431 5.5867 81.4997 5.85078C82.2018 6.13267 82.8539 6.52603 83.4307 7.0157L82.84 7.75416C81.8197 6.81982 80.4792 6.3135 79.096 6.34001C78.6679 6.3332 78.2415 6.39554 77.8332 6.52463C77.486 6.63132 77.1599 6.79747 76.8695 7.0157C76.6116 7.21892 76.4012 7.47598 76.2529 7.76893C76.1081 8.05493 76.0341 8.37147 76.0369 8.69201V8.72709C76.0328 9.03541 76.0847 9.34192 76.1901 9.6317C76.3064 9.92241 76.4974 10.1772 76.744 10.3702C77.0822 10.629 77.46 10.8316 77.8627 10.9702C78.4588 11.1819 79.0697 11.3491 79.6904 11.4705C81.1477 11.7695 82.1981 12.1905 82.8418 12.7332C83.1597 13.0012 83.4122 13.3382 83.5799 13.7187C83.7475 14.0991 83.826 14.5129 83.8092 14.9283V14.9542C83.8138 15.435 83.7064 15.9103 83.4954 16.3425C83.2908 16.7614 82.9979 17.1311 82.6369 17.4262C82.2477 17.7381 81.8039 17.9747 81.328 18.124C80.7865 18.2983 80.2205 18.3843 79.6517 18.3788Z" fill="white"/><path d="M89.5394 18.3615C89.1993 18.3642 88.8607 18.3157 88.5351 18.2175C88.229 18.1264 87.9476 17.967 87.7119 17.7515C87.4763 17.536 87.2925 17.2699 87.1744 16.9732C87.0358 16.6162 86.9687 16.2355 86.9769 15.8526V9.87105H85.6514V9.06428H86.9769V6.14551H87.8557V9.06428H91.0606V9.87105H87.8557V15.7492C87.8557 16.404 88.0255 16.8631 88.3652 17.1264C88.7473 17.4017 89.211 17.5402 89.6815 17.5197C89.8981 17.5201 90.1141 17.4972 90.3258 17.4514C90.5656 17.3935 90.7997 17.3144 91.0255 17.2151V18.0384C90.7981 18.1404 90.5613 18.2202 90.3184 18.2766C90.0628 18.334 89.8014 18.3625 89.5394 18.3615Z" fill="white"/><path d="M97.5272 18.4156C96.8827 18.423 96.2442 18.2914 95.6552 18.0298C95.1023 17.7826 94.6012 17.4331 94.1783 16.9996C93.7586 16.5663 93.4275 16.0552 93.2035 15.495C92.968 14.9153 92.8488 14.2949 92.8527 13.6692V13.6322C92.8444 12.7029 93.1076 11.7914 93.61 11.0095C94.1125 10.2277 94.8323 9.60956 95.681 9.23102C96.2737 8.97074 96.915 8.83983 97.5623 8.84702C98.2066 8.83909 98.8451 8.97006 99.4343 9.23102C99.987 9.47851 100.488 9.828 100.911 10.2612C101.332 10.6943 101.663 11.2054 101.888 11.7658C102.122 12.3466 102.24 12.9674 102.237 13.5935V13.6286C102.24 14.2547 102.122 14.8755 101.888 15.4562C101.661 16.0245 101.326 16.5435 100.902 16.9849C100.477 17.4291 99.969 17.7854 99.4066 18.0335C98.8144 18.2931 98.1737 18.4234 97.5272 18.4156ZM97.5623 17.5738C98.0797 17.5778 98.592 17.4714 99.065 17.2618C99.5117 17.066 99.9152 16.7836 100.252 16.431C100.588 16.0721 100.851 15.6514 101.026 15.1922C101.215 14.7045 101.311 14.1851 101.306 13.6618V13.6267C101.31 13.0992 101.212 12.5759 101.018 12.0852C100.835 11.618 100.563 11.191 100.217 10.8279C99.8748 10.4714 99.465 10.1864 99.0115 9.98979C98.5454 9.788 98.0425 9.68492 97.5346 9.68702C97.0165 9.6821 96.5034 9.7885 96.03 9.99902C95.5828 10.1974 95.1794 10.4822 94.8429 10.8372C94.5078 11.1966 94.2452 11.6172 94.0694 12.0759C93.8818 12.5591 93.7872 13.0734 93.7906 13.5916V13.6267C93.7871 14.1548 93.8849 14.6788 94.0786 15.1701C94.2592 15.6378 94.5288 16.066 94.8724 16.431C95.2141 16.7879 95.6241 17.0723 96.078 17.2673C96.5458 17.4724 97.0515 17.5768 97.5623 17.5738Z" fill="white"/><path d="M104.762 9.06424H105.639V11.6618C105.817 11.258 106.046 10.8788 106.321 10.5338C106.587 10.1948 106.901 9.89631 107.253 9.64762C107.599 9.40271 107.984 9.21566 108.39 9.09378C108.809 8.96732 109.245 8.90995 109.682 8.92393V9.89132H109.594C109.078 9.88897 108.566 9.98938 108.089 10.1867C107.61 10.3839 107.179 10.6832 106.826 11.0636C106.445 11.4792 106.149 11.966 105.957 12.4962C105.732 13.1255 105.622 13.7904 105.634 14.4587V18.199H104.757L104.762 9.06424Z" fill="white"/><path d="M115.609 18.4157C115.021 18.4173 114.438 18.3012 113.896 18.0741C113.356 17.8518 112.868 17.5227 112.459 17.1067C112.036 16.6753 111.704 16.1637 111.481 15.6021C111.231 14.9822 111.105 14.3191 111.112 13.6507V13.6157C111.108 12.9851 111.221 12.3594 111.444 11.7695C111.651 11.2129 111.96 10.7 112.356 10.2575C112.743 9.82667 113.213 9.47767 113.737 9.23105C114.274 8.97979 114.862 8.85355 115.456 8.86182C116.055 8.85236 116.649 8.97858 117.193 9.23105C117.699 9.46963 118.148 9.81472 118.509 10.2427C118.882 10.6899 119.168 11.2035 119.351 11.7566C119.553 12.3655 119.653 13.0037 119.646 13.6452V13.8298C119.645 13.8868 119.639 13.9435 119.63 13.9997H112.06C112.102 14.9944 112.524 15.9352 113.238 16.6286C113.557 16.9348 113.933 17.174 114.346 17.332C114.758 17.492 115.196 17.574 115.638 17.5738C116.273 17.5962 116.902 17.4571 117.468 17.1695C117.958 16.8988 118.403 16.5538 118.788 16.1467L119.395 16.6858C118.935 17.1821 118.399 17.6021 117.808 17.9301C117.128 18.2767 116.371 18.4438 115.609 18.4157ZM118.716 13.2021C118.682 12.7476 118.588 12.2994 118.437 11.8692C118.295 11.4586 118.082 11.0762 117.808 10.7394C117.535 10.4089 117.195 10.1407 116.811 9.9529C116.396 9.7629 115.945 9.66225 115.489 9.65747C115.033 9.6527 114.58 9.74392 114.161 9.92521C113.771 10.0989 113.42 10.3502 113.129 10.6637C112.822 10.9954 112.572 11.3768 112.391 11.7917C112.198 12.237 112.083 12.7123 112.051 13.1966L118.716 13.2021Z" fill="white"/><path d="M122.77 16.7984L121.83 18.4156L121.201 16.5067L120.569 14.5996L122.478 15.2291L124.385 15.8587L122.77 16.7984Z" fill="white"/></svg>
           </Link>
          {/* iconos */}
          <div className="flex gap-4 justify-between">
            <svg className="hover:cursor-pointer w-5 h-5 text-white" onClick={() => setMenuCarritoVisible(!menuCarritoVisible)} fill="none"viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>
            <p className="text-gray-100">
              {productosIcono}
            </p>
            <Link to="/login">
            <svg className=" hover:cursor-pointer w-5 h-5 text-white"viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd"/></svg>
            </Link>
          </div>

        </div>

        <input className="w-full m-auto bg-white-500 rounded-md py-2 px-5 placeholder:text-sm placeholder:font-semibold  placeholder:text-gray-800 placeholder:text-center " placeholder="Buscar..." type="search" name="" id="" />
      </div>
    </header>
  );
};

export default Header;
