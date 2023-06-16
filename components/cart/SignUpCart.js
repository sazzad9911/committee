import React from "react";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import { SvgXml } from "react-native-svg";
import cart from "../../assets/cart.png";
const { width, height } = Dimensions.get("window");

export default function SignUpCart({ title }) {
  return (
    <View style={{ flex: 1 }}>
      {/* <SvgXml style={{}}  width={"100%"} xml={vector} /> */}
      <Image
        style={{
          width: width - 40,
          height: "100%",
          borderRadius: 20,
          position: "absolute",
          top: 0,
          left: 0,
        }}
        source={cart}
      />
      <View
        style={{
          padding: 16,
        }}>
        <Text
          style={{
            fontSize: 24,
            marginVertical: 10,
            color: "#fff",
            fontWeight: "600",
          }}>
          {title}
        </Text>
        <View
          style={{
            backgroundColor: "#E44D4B",
            borderRadius: 16,
            width: "100%",
            paddingHorizontal: 24,
            paddingVertical: 8,
            alignItems:"center"
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "#fff",
              textAlign:"center"
            }}>
            নিজের একটি শক্তিশালী কমিটি ঘঠন করুন{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 8,
              alignItems: "center",
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "400",
                color: "#fff",
              }}>
              একটি কমিটি ঘঠন করুন{" "}
            </Text>
            <Pressable
              style={{
                backgroundColor: "#7588FF",
                marginLeft: 12,
                padding: 8,
                borderRadius: 7,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: "#fff",
                }}>
                সাইন আপ{" "}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const vector = `<svg width="355" height="217" viewBox="0 0 355 217" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_569_8305" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="355" height="217">
<rect width="355" height="217" rx="33" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_569_8305)">
<rect width="355" height="217" rx="32" fill="url(#paint0_linear_569_8305)"/>
<path d="M313.041 22.0267C339.602 37.3619 361.844 54.335 376.333 69.3682C383.58 76.8874 388.867 83.9001 391.793 89.9616C394.727 96.0413 395.232 101.042 393.149 104.65C391.066 108.258 386.483 110.321 379.75 110.82C373.038 111.317 364.321 110.244 354.186 107.728C333.922 102.697 308.102 91.9215 281.541 76.5863C254.98 61.2511 232.738 44.278 218.249 29.2448C211.002 21.7256 205.715 14.7129 202.789 8.65139C199.855 2.57165 199.35 -2.42909 201.433 -6.03716C203.516 -9.64522 208.099 -11.7085 214.832 -12.2068C221.544 -12.7036 230.261 -11.6313 240.396 -9.1148C260.66 -4.08351 286.48 6.6915 313.041 22.0267Z" stroke="white"/>
<path d="M214.238 73.933C231.17 83.7091 244.693 95.6417 252.874 107.011C261.086 118.422 263.801 129.086 259.543 136.463C255.284 143.839 244.691 146.819 230.703 145.414C216.765 144.013 199.67 138.269 182.738 128.493C165.805 118.717 152.283 106.784 144.101 95.4144C135.89 84.0033 133.174 73.3394 137.433 65.9628C141.692 58.5863 152.285 55.6064 166.273 57.0121C180.21 58.4127 197.305 64.157 214.238 73.933Z" stroke="white"/>
<path d="M115.238 97.933C132.17 107.709 145.693 119.642 153.874 131.011C162.086 142.422 164.801 153.086 160.543 160.463C156.284 167.839 145.691 170.819 131.703 169.414C117.765 168.013 100.67 162.269 83.7378 152.493C66.8052 142.717 53.283 130.784 45.1015 119.414C36.8901 108.003 34.1742 97.3394 38.433 89.9628C42.6918 82.5863 53.2851 79.6064 67.2731 81.0121C81.2101 82.4127 98.3052 88.157 115.238 97.933Z" stroke="white"/>
<path d="M51.2378 168.933C68.1704 178.709 81.6926 190.642 89.8741 202.011C98.0855 213.422 100.801 224.086 96.5426 231.463C92.2838 238.839 81.6905 241.819 67.7025 240.414C53.7655 239.013 36.6704 233.269 19.7378 223.493C2.80523 213.717 -10.717 201.784 -18.8985 190.414C-27.1099 179.003 -29.8258 168.339 -25.567 160.963C-21.3082 153.586 -10.7149 150.606 3.27307 152.012C17.2101 153.413 34.3052 159.157 51.2378 168.933Z" stroke="white"/>
</g>
<defs>
<linearGradient id="paint0_linear_569_8305" x1="0" y1="108.5" x2="355" y2="108.5" gradientUnits="userSpaceOnUse">
<stop stop-color="#1488CC"/>
<stop offset="1" stop-color="#2B32B2"/>
</linearGradient>
</defs>
</svg>
`;
