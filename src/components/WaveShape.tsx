import React from "react";
import Svg, { Path } from "react-native-svg";
import { StyleSheet } from "react-native";

export default function WaveShape() {
  return (
    <Svg
      style={styles.waveShape}
      width="100%"
      height="200"
      viewBox="0 0 1719 874"
      fill="none"
      preserveAspectRatio="none"
    >
      <Path
        d="M5.92773 590.482C306.022 447.951 544.719 504.487 802.354 602.39C1060 700.298 1336.42 839.439 1713.16 863.505L1712.84 868.495C1335.13 844.368 1057.73 704.784 800.577 607.063C543.41 509.338 306.328 453.341 8.07227 594.999L5.92773 590.482Z"
        fill="#EEAD2D"
      />
      <Path
        d="M5.92773 590.482C306.022 447.951 544.719 504.487 802.354 602.39C1060 700.298 1336.42 839.439 1713.16 863.505L1712.84 5H8.07227L5.92773 590.482Z"
        fill="#EEAD2D"
      />
      <Path
        d="M5.92773 590.482C306.022 447.951 544.719 504.487 802.354 602.39C1060 700.298 1336.42 839.439 1713.16 863.505M5.92773 590.482L8.07227 594.999C306.328 453.341 543.41 509.338 800.577 607.063C1057.73 704.784 1335.13 844.368 1712.84 868.495L1713.16 863.505M5.92773 590.482L8.07227 5H1712.84L1713.16 863.505"
        stroke="#EEAD2D"
        strokeWidth="10"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  waveShape: {
    position: "absolute",
    top: -60,
  },
});
