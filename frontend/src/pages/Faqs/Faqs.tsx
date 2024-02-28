import { Box } from "@mui/material";
import Faq from "react-faq-component";
import faqimage from "../../assets/images/about.jpg";
import Navbar from "../../Components/NavBar";

const FAQS: React.FC = () => {
  const data = {
    title: "FAQ (How it works)",
    rows: [
      {
        title: "Lorem ipsum dolor sit amet,",
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sed tempor sem. Aenean vel turpis feugiat,
                       ultricies metus at, consequat velit. Curabitur est nibh, varius in tellus nec, mattis pulvinar metus.
                       In maximus cursus lorem, nec laoreet velit eleifend vel. Ut aliquet mauris tortor, sed egestas libero interdum vitae.
                       Fusce sed commodo purus, at tempus turpis.`,
      },
      {
        title: "Nunc maximus, magna at ultricies elementum",
        content:
          "Nunc maximus, magna at ultricies elementum, risus turpis vulputate quam, vitae convallis ex tortor sed dolor.",
      },
      {
        title: "Curabitur laoreet, mauris vel blandit fringilla",
        content: `Curabitur laoreet, mauris vel blandit fringilla, leo elit rhoncus nunc, ac sagittis leo elit vel lorem.
                     Fusce tempor lacus ut libero posuere viverra. Nunc velit dolor, tincidunt at varius vel, laoreet vel quam.
                     Sed dolor urna, lobortis in arcu auctor, tincidunt mattis ante. Vivamus venenatis ultricies nibh in volutpat.
                     Cras eu metus quis leo vestibulum feugiat nec sagittis lacus.Mauris vulputate arcu sed massa euismod dignissim. `,
      },
      {
        title: "What is the package version",
        content: <p>current version is 1.2.1</p>,
      },
    ],
  };

  const styles = {
    bgColor: "white",
    titleTextColor: "#4a5cfb",
    titleTextSize: "48px",
    rowTitleColor: "#53577a",
    rowTitleTextSize: "medium",
    rowContentColor: "#0e5a9b",
    //     rowContentTextSize: "16px",
    //     rowContentPaddingTop: '10px',
    //     rowContentPaddingBottom: "10px",
    //     rowContentPaddingLeft: "50px",
    //     rowContentPaddingRight: '150px',
    arrowColor: "#4a5cfb",
    transitionDuration: "1s",
    timingFunc: "ease",
  };

  const config = {
    animate: true,
    //     arrowIcon: "V",
    tabFocus: true,
  };
  return (
    <>
    <Navbar></Navbar>
      <Box sx={{ display: "flex", height: "100vh" }}>
        {/* FAQ Section */}
        <Box sx={{ flex: 1, backgroundColor: "rgba(255,255,255,0.8)", padding: "20px", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
          <Faq data={data} styles={styles} config={config} />
        </Box>
        {/* Image Section */}
        <Box sx={{ flex: 1, backgroundImage: `url(${faqimage})`, backgroundSize: "contain", backgroundRepeat: "no-repeat" }} />
      </Box>
    </>
  );
};
export default FAQS;
