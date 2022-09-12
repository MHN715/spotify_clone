import { cssSongInfoBtn } from "../style/cssPlayer";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/lazy";
export default function PlayerFullScreen({
  setplayerFullScreen,
  playerFullScreen,
}) {
  return (
    <>
      <button
        css={cssSongInfoBtn}
        onClick={(e) => {
          console.log(e);
          console.log("clicked");
          setplayerFullScreen(!playerFullScreen);
        }}
      >
        test
      </button>
      <main>
        <Swiper
          spaceBetween={13}
          slidesPerView={3}
          // freeMode={true}
          // lazy={true}
          // loadOnTransitionStart={true}
          // checkInView={true}
          // loadPrevNext={true}
          // loadPrevNextAmount={3}
          // modules={[Lazy, FreeMode]}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log("onSwiper:", swiper)}
          onReachEnd={(e) =>
            e.progress > 0 && e.isEnd === true
              ? console.log("carousel end reached")
              : null
          }
        ></Swiper>
      </main>
    </>
  );
}
