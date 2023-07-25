import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

const mainStyle = StyleSheet.create({
  fullContainer: {
    flex: 1,
  },
  paddedContainer: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headLine: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 24,
  },
  moreButton: {
    borderWidth: 0,
  },
  mt24: {
    marginTop: 24,
  },
  pdH20: {
    paddingHorizontal: 20,
  },
  mH20: {
    marginHorizontal: 20,
  },
  level: {
    fontSize: 20,
    fontWeight:"500"
  },
  subLevel: {
    fontSize: 16,
  },
  mt12: {
    marginTop: 12,
  },
  mt8: {
    marginTop: 8,
  },
  flexBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  halfInput: {
    width: width / 2 - 20 - 6,
  },
  ht32: {
    height: 32,
  },
  pdV20: {
    paddingVertical: 20,
  },
  text14: {
    fontSize: 14,
  },
  mt32: {
    marginTop: 32,
  },

  mediumText: {
    fontSize: 16,
    fontWeight: "500",
  },
  smallText: {
    fontSize: 12,
    fontWeight: "300",
  },
});
export default mainStyle;
