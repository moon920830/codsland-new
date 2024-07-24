import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Element } from 'react-scroll';

import Button from "@mui/material/Button";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TextField from "@mui/material/TextField";

import About from "../components/home/about";
import HomeCard from "../components/home/card";
import Collapse from "../components/home/collapse";
import SelectButton from "../components/home/selectbutton";
import Footer from "../components/layouts/footer";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const handleAnnual = () => {
    navigate("/membership/annual")
  }
  return (
    <>
      <div className="pt-[50px] sm:pt-[91px] m-auto">
        <img src="/images/dean_lebecca.png" className="w-full" />
        <div className="bg-[#2E3192] w-full py-10 px-2">
          <div className="text-lg sm:text-5xl text-white text-center">
            Welcome to the Home of True Healing!
          </div>
          <div className="text-lg sm:text-[40px] text-white text-center mt-2">
            Join with us and gain access to
          </div>
          <div className="mt-5 sm:mt-10 flex flex-wrap space-x-5 text-white justify-center text-sm sm:text-xl">
            <Link to="/hands-on-healing" className="hover:text-blue-700">
              <u>Hands-on Healing,</u>
            </Link>
            <Link to="/hands-on-healing" className="hover:text-blue-700">
              <u>Healing Guidance,</u>
            </Link>
            <Link to="/hands-on-healing" className="hover:text-blue-700">
              <u>Healing Training,</u>
            </Link>
            <Link to="/hands-on-healing" className="hover:text-blue-700">
              <u>Healing Products,</u>
            </Link>
            <Link to="/hands-on-healing" className="hover:text-blue-700">
              <u>Baked Health Foods</u>
            </Link>
          </div>
        </div>
        <Element className="mt-10" name="about">
          <img
            src="/images/CoDS_Black_Logo.png"
            className="w-[120px] sm:w-[286px] m-auto"
            alt="logo"
          />
        </Element>
        <div className="mt-10">
          <About />
        </div>
        <div
          className="mt-10 text-[#2E3192] text-center py-10 px-10"
          style={{
            background: "linear-gradient(111.91deg, #FFFFFF 0%, #C0C1DE 100%)",
          }}
        >
          <div className="text-sm sm:text-xl font-bold">
            Spiritual Healer Near Me
          </div>
          <div className="text-xl font-bold sm:text-[45px] mt-5 sm:mt-10 sm:leading-[65px]">
            CODS is the Association for True Healing
          </div>
          <div className="text-sm sm:text-xl font-medium mt-5">
            At Church of Divine Structure, our healing services encompass four
            fundamental categories, tailored to nurture true hand-on healing.
          </div>
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-10">
            <HomeCard
              title="Hands-On Healing"
              direction={true}
              content="Our skilled healers have developed unique and powerful methods to treat new and chronic injuries and energy blockages with accumulative, lasting benefits."
              link="www.drdeanhowell.com"
            />
            <HomeCard
              title="Hands-On Healing"
              direction={false}
              content="Our expertise is to find the right course of bodily and lifestyle corrections to guide you towards healing."
              link="angelreadings.live"
            />
            <HomeCard
              title="Hands-On Healing"
              direction={true}
              content="There are two ways to utilize supplementation: treat the symptoms and side effects that you are suffering or correct the causes of your problems."
              link="www.theessenceoflife.com"
            />
            <HomeCard
              title="Hands-On Healing"
              direction={false}
              content="We are inundated with bad things in our world! Here we feature products to protect your body and your home and office from some of them"
              link="www.theessenceoflife.com"
            />
            <HomeCard
              title="Healing Training with the Developers"
              direction={true}
              content="We offer three healing trainings to CODS Members. We are offering NCR Practitioner Training, Howelling Methodologies, and Energy Healing with Rebecca courses in 2024 and 2025."
              link="getncrtraining.com"
            />
            <HomeCard
              title="Missing your bakery? Here's our unique solution!"
              direction={false}
              content="Many people realize just how unhealthy a traditional bakery is---the foods there are loaded with white flour and sugars....until CODS' own Reverend Rebecca developed amazing, tastes like junk foods that only feature healthy ingredients!"
              link="damerebeccasbakery.com"
            />
            <HomeCard
              title="Members can buy Radionics equipment and training courses"
              direction={true}
              content="Our equipment is all American made and designed by world-renowned radionics inventor and author Peter Radatti."
              link="www.radattiradionics.com"
            />
          </div>
        </div>
        <div className="mt-10 grid grid-col-1 lg:grid-cols-2 px-10 gap-10 lg:gap-20">
          <div className="text-[#2E3192] lg:text-right">
            <div className="text-xl sm:text-4xl font-bold lg:mt-20">
              Our Journey to Dynamic
              <br /> Energetic Healing
            </div>
            <div className="text-sm sm:text-xl font-bold mt-5 ">
              Unraveling the Path to Wellness
            </div>
            <div className="text-[#475569] text-sm sm:text-lg font-medium leading-[20px] mt-10 lg:max-w-[400px] lg:ml-auto">
              In the heart of our shared history lies a transformative tale,
              woven by the hands of healers and visionaries, Rev Dr. Dean Howell
              and Rev Rebecca Hart Malter. With over four decades of healing and
              counseling experience, Dr. Dean's expertise in NeuroCranial
              Restructuring melds seamlessly with Rebecca's profound skills in
              Body Electronics and medical psychic abilities. Together, as life
              partners, they embarked on a remarkable journey within the realm
              of holistic health. Dr. Dean with 41 years of masterful expertise
              under his belt and Rebecca, with illustrious
            </div>

            <div className="w-full text-right">
              <Button
                variant="contained"
                sx={{
                  borderRadius: "37px",
                  backgroundColor: "#2E3192",
                  width: "100px",
                  marginTop: "20px",
                }}
              >
                Explore
              </Button>
            </div>
          </div>
          <div className="bg-[#E9EAF8] lg:rounded-tl-[200px]">
            <img
              src="/images/dean_wedding.png"
              alt="img"
              className="w-full h-full"
            />
          </div>
        </div>
        <div className="mt-10 px-10">
          <video width="100%" height="100%" controls autoPlay muted>
            <source
              src="https://drive.google.com/uc?export=download&id=1fDX2sY7ONTg64IZ_k0M2R3Y7GAuvsBRT"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="mt-10 px-10">
          <img
            src="/images/CoDS_Black_Logo.png"
            className="lg:w-[264px] m-auto"
          />
          <div className="">
            <div className="text-xl sm:text-4xl font-bold mt-5 lg:mt-10 text-[#2E3192] text-center">
              AT CoDS, WE ARE ALL ABOUT HEALING
            </div>
            <Collapse
              content="When people think of getting healthy, they think that they need treatments. This is the commerce-based concept that we have all accepted. Why?
                     How can you be healed by therapists who will only treat you? Rev Dr Howell and Rev Rebecca decided
                     to be healers instead. Dr Howell closed his practice years ago and became Rev Dr Howell instead. Health
                     centers and clinics can be organized outside the US governmental system within Churches.

                     CoDS is a worldwide healing community with its headquarters in Okanogan County, Washington. We are
                     affiliated with the Eastern Orthodox Catholic Church. The Catholic Church meant the universal church,
                     the church of the whole world. The Eastern Orthodox Catholic Church was originally founded in Rome by
                     Saint Peter. Emperor Constantine decided that the Roman churchmen were too corrupt to be true
                     Christians, so he moved the Catholic Church to Constantinople. Later the Church was moved to Brazil,
                     where it is located today. Another “Catholic” church was started in Rome in the 400s AD, and that is the
                     Roman Catholic Church organization of today, even at its beginnings it was the corrupt organization that
                     it remains.

                     The Knights of St. John was founded in 1653 to serve as the healers and hospitallers for the Knights of
                     Malta. The Church of Hope is only healing order that still remains in the Knights of St. John. The Church
                     of Divine Structure Priory No. 175 is an auxiliary of the Church of Hope.

                     Ecclesiastically, all of our ministers and deacons are members of the Sacred Medical Order of the Knights
                     and Dames of Hope. We are led by our visionaries, Reverend Doctor Dean Howell and Reverend
                     Rebecca Hart Malter."
              leading={55}
            />
          </div>
        </div>
        <div className="mt-10 px-10">
          <div className="text-xl sm:text-4xl font-bold mt-5 lg:mt-10 text-[#2E3192] text-center">
            Our Staff Roster
          </div>
          <div className="mt-20 flex flex-col lg:flex-row gap-10 sm:gap-20">
            <div className="lg:basis-4/12">
              <img src="/images/Rectangle 3860.png" className="w-full" />
            </div>
            <div className="lg:basis-8/12">
              <div className="text-[#475569] text-xl sm:text-3xl font-extrabold">
                Reverend Dr Dean Howell
              </div>
              <Collapse
                content="became a naturopathic physician in 1982 because he was determined to treat the causes of people’s ailments. But, he discovered, almost all medical AND naturopathic medical care was designed to bring the medical consumer relief of symptoms. The naturopathic solutions were slower and usually more effective than the others available—but they were often not cures, either. Dr. Howell worked for ten years at his naturopathic family practice before he realized the folly of his commercial naturopathic practice. Commerce and healing could not co-exist, he decided. He closed his large family practice clinic in Everett, WA and slowly began a healing practice, developing...
                               NeuroCranial Restructuring, a bio-mechanical,
                               accumulative manipulation technique in the 1990s. He continued to develop and improve his
                               hands-on healing techniques and has continued exploring healing methods that are out-of-the-
                               ordinary. Knowing that he had been targeted and had his license revoked for administering
                               vitamin B-12, Dr Howell set up his healing business outside of the commerce system where
                               medical licensing boards controlled everything. that he might become legally targeted, he
                               changed his healing practice into a private membership association. He set this up as NCR-01,
                               a not-for-profit, private membership association in 2001. More recently, Dr. Howell’s spiritual,
                               healing path made him realize the depth of his faith. He became religious again. In order to
                               legally demonstrate their convictions, he and Reverend Rebecca joined the Church of Hope as
                               Ministers and Sanctified Healers. They were ordained as Eastern Orthodox Catholic ministers in
                               2019. NCR-01 legally transformed itself into the Church of Divine Structure, Priory No. 175 of the Church of Hope. As members of the Sacred Medical Order of the Knights of Hope, their healing credentials are accepted by the United Nations so that they are accepted as healers anywhere they choose to go."
                leading={36}
              />
            </div>
          </div>
          <div className="mt-20 flex flex-col lg:flex-row gap-10 sm:gap-20">
            <div className="lg:basis-8/12">
              <div className="text-[#475569] text-xl sm:text-3xl font-extrabold sm:text-right">
                Reverend Rebecca Hart Malter
              </div>
              <Collapse
                content="She was born and raised in Brooklyn. She always had these odd “talents” that made her thought of as weird. In college, her talents were more appreciated, and she was recruited as a psychic by the UN and US government. After they tested her skills, she began working with them in unpleasant situations—crime scenes, accidents, meetings in odd places surrounded by exotic technology. This became overwhelming, and she turned to healing in the 1990s. She showed exceptional aptitude in energy healing techniques, so she developed her Brooklyn-based practice specializing in massage with energy treatments. She did this for 15 years, until she met Dr. Howell in 2013.
                               When they began working together, they discovered that their hands-on methods blended beautifully, and their work progressed and became more dynamic, with episodes of true healing and other notable results. While Rev Dr Howell focused on the development of Howelling, Rev Rebecca continued with her Body Electronics and intuitively-based guidance—then, in her free time, she focused on the development of the recipes for Dame Rebecca’s Bakery where she utilized her professional baking background to create amazingly delicious bakery products with the Magic Flour developed by Rev Peter Radatti."
                leading={36}
              />
            </div>
            <div className="lg:basis-4/12">
              <img src="/images/Rectangle 3861.png" className="w-full" />
            </div>
          </div>
          <div className="mt-20 flex flex-col lg:flex-row gap-10 sm:gap-20">
            <div className="lg:basis-4/12">
              <img src="/images/Rectangle 3862.png" className="w-full" />
            </div>
            <div className="lg:basis-8/12">
              <div className="text-[#475569] text-xl sm:text-3xl font-extrabold">
                Minister of Healing Technologies Peter Radatti
              </div>
              <Collapse
                content="Reverend Peter began as a physicist and worked for NASA and other organizations as a scientist before founding CyberSoft, the first anti-viral computer service company over 30 years ago. As a side project, he developed an alternative to baking flour. What is amazing about the Magic Flour is that it is high in fiber content, has no carbohydrates, will not feed insects or rodents, and there is no way to become allergic to it. Is magic, indeed! Rev Peter is also a developer of radionic equipment, and he has written a series of radionic textbooks that are best-sellers on Amazon. We have named our Radionics Department is his honor. Members can buy his amazing technology from the Members’ Store. Members can also read Rev Peter’s writings…."
                leading={36}
              />
            </div>
          </div>
          <div className="mt-10">
            <img
              src="/images/CoDS_Black_Logo.png"
              className="lg:w-[264px] m-auto"
            />
            <div className="text-xl sm:text-4xl font-bold mt-5 lg:mt-10 text-[#2E3192] text-center">
              Church of Divine Structure Priory 175 is also called CoDS
            </div>
            <div className="mt-5">
              <Collapse
                content="The Church of Divine Structure is dedicated to healing and survival. We believe in the importance and sanctity of true healing. It is the fundamental outreach of our organization. We develop and maintain healing services to address the needs of mankind. These are the talents, motivations, and intentions of our group: we want to help all achieve spiritual ascendance with our healing help. Commerce is not the aim of humanity, and it is not an objective of our Church. In order to be of"
                leading={55}
              />
            </div>
            <div className="text-xl sm:text-4xl font-bold mt-5 lg:mt-10 text-[#2E3192] text-center">
              WE HAVE EXPERIENCED HEALING! HERE IS OUR STORY
              <Collapse
                content="The Church of Divine Structure is dedicated to healing and survival. We believe in the importance and sanctity of true healing. It is the fundamental outreach of our organization. We develop and maintain healing services to address the needs of mankind. These are the talents, motivations, and intentions of our group: we want to help all achieve spiritual ascendance with our healing help. Commerce is not the aim of humanity, and it is not an objective of our Church. In order to be of"
                leading={55}
              />
            </div>
          </div>
          <div className="mt-20">
            <div className="text-xl sm:text-4xl font-bold mt-5 lg:mt-10 text-[#2E3192] text-center">
              Articles
            </div>
            <div className="mt-10 flex flex-col lg:flex-row gap-10 sm:gap-20">
              <div className="sm:basis-1/2">
                <div className="py-5 px-5 sm:py-12 sm:px-10 shadow-2xl rounded-3xl max-w-[450px] ml-auto mr-auto lg:ml-auto lg:mr-0 text-center">
                  <div className="text-xl sm:text-2xl text-[#2E3192] font-bold text-left">
                    The Church of Hope's Holistic Approach
                  </div>
                  <div className="mt-10 text-sm sm:text-xl text-[#828282] text-left">
                    Rev Dr. Howell and Rev Rebecca offer holistic healing
                    through the Church of Hope.
                  </div>
                  <Button
                    size="large"
                    variant="contained"
                    sx={{
                      borderRadius: "37px",
                      backgroundColor: "#2E3192",
                      width: "100%",
                      marginTop: "40px",
                    }}
                  >
                    Read More
                    <ArrowOutwardIcon sx={{ marginLeft: "5px" }} />
                  </Button>
                </div>
              </div>
              <div className="sm:basis-1/2">
                <div className="py-5 px-5 sm:py-12 sm:px-10 shadow-2xl rounded-3xl max-w-[450px] ml-auto mr-auto lg:mr-auto lg:ml-0 min-h-[366.2px]">
                  <div className="text-xl sm:text-2xl text-[#2E3192] font-bold text-left">
                    CODS (Church of Divine Structure Priory 175, Inc.)
                  </div>
                  <div className="mt-10 text-sm sm:text-xl text-[#828282] text-left">
                    A holistic approach to healing beyond commerce.
                  </div>
                  <Button
                    size="large"
                    variant="contained"
                    sx={{
                      borderRadius: "37px",
                      backgroundColor: "#2E3192",
                      width: "100%",
                      marginTop: "65px",
                    }}
                  >
                    Read More
                    <ArrowOutwardIcon sx={{ marginLeft: "5px" }} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <hr />
          </div>
          <div className="mt-20 text-[#2E3192] text-center">
            <div className="text-sm sm:text-xl font-bold">
              Spiritual Healer Near Me
            </div>
            <div className="text-xl font-bold sm:text-4xl mt-5 sm:mt-10 sm:leading-[65px]">
              CODS is the Association for True Healing
            </div>
            <div className="text-sm sm:text-xl font-medium mt-10">
              At Church of Divine Structure, we believe in making holistic
              healing accessible to all. Our pricing plans are designed to offer
              flexibility and affordability, ensuring that the path to true
              well-being is within reach for everyone.
            </div>
            <div className="rounded-[50px] bg-[#010236] py-10 sm:py-20 px-5 sm:px-10 w-[300px] sm:w-[450px] m-auto mt-20 text-white text-left">
              <div className="text-2xl sm:text-[55px] font-bold">
                $100
                <span className="text-lg sm:text-2xl font-medium">/year</span>
              </div>
              <div className="mt-5 text-xl sm:text-[40px] font-extrabold">
                Annual Member
              </div>
              <div className="mt-5 sm:mt-10 text-lg sm:text-2xl font-medium">
                Able to post a sharing contentsAble to book an appointmentAble
                to cancel or reschedule appointments 7 or more days in advance
              </div>
              <div className="mt-10 justify-center flex">
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "37px",
                    backgroundColor: "#2E3192",
                    width: "90%",
                    marginTop: "20px",
                  }}
                  onClick={handleAnnual}
                >
                  Learn more
                </Button>
              </div>
            </div>
            <div className="text-xl font-bold sm:text-4xl mt-10 sm:mt-20 sm:leading-[65px]">
              Special Price is ending soon!
            </div>
          </div>
        </div>
        <Element className="mt-10 bg-[#0F172A] py-10 px-10 text-white text-center" name="contact">
          <div className="text-xl font-bold sm:text-4xl mt-10 sm:mt-20 sm:leading-[65px]">
            Personalized Support
          </div>
          <div className="mt-5 sm:mt-10 text-lg sm:text-2xl font-medium opacity-70">
            Discover the path to transformative healing. If you have questions,
            need more information, or want to start your healing journey with
            us, our dedicated team is here to assist you. Feel free to get in
            touch; we are just a message away.
          </div>
          <div className="mt-10 flex lg:flex-row flex-col sm:p-10 gap-10 text-left">
            <div className="basis-5/12">
              <div className="text-xl font-bold sm:text-4xl mt-10 sm:mt-20 sm:leading-[65px]">
                Contact Information
              </div>
              <div className="mt-2 sm:mt-5 text-lg sm:text-lg font-medium">
                SAY SOMETHING TO START A LIVE CHAT!
              </div>
              <div className="mt-5 text-xl font-normal">
                <EmailIcon
                  sx={{ color: "#2E3192", width: "30px", marginRight: "10px" }}
                />
                info@cods.land
              </div>
              <div className="mt-5 flex gap-5 text-[#2E3192] text-[30px] items-center">
                <div>
                  <LinkedInIcon sx={{ cursor: "pointer" }} />
                </div>
                <img
                  src="/images/be.png"
                  alt="img"
                  className="w-[25px] h-[20px] mt-[3px] cursor-pointer"
                />
                <img
                  src="/images/ins.png"
                  alt="img"
                  className="w-[25px] h-[20px] mt-[3px] cursor-pointer"
                />
              </div>
            </div>
            <div className="basis-7/12 bg-white rounded-3xl pb-5">
              <div className="mt-5 text-[#0F172A] font-semibold text-lg sm:px-10 px-5">
                I’m interested in:
              </div>
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 sm:px-10 px-5 mt-5 w-[100%] xl:w-[90%]">
                <SelectButton name="UX/ UI design" />
                <SelectButton name="Web design" />
                <SelectButton name="Design system" />
                <SelectButton name="Graphic design" />
                <SelectButton name="Other" />
              </div>
              <div className="mt-10 sm:px-10 px-5 w">
                <TextField
                  required
                  id="outlined-required"
                  label="Your Name"
                  sx={{ width: "100%" }}
                />
                <TextField
                  required
                  id="outlined-required"
                  label="Your Email"
                  sx={{ width: "100%", marginTop: "20px" }}
                />
                <TextField
                  required
                  multiline
                  id="outlined-required"
                  label="Your Message"
                  sx={{ width: "100%", marginTop: "20px" }}
                  rows={5}
                />
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "37px",
                    backgroundColor: "#2E3192",
                    width: "100%",
                    marginTop: "20px",
                  }}
                  size="large"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </Element>
      </div>
      <Footer />
    </>
  );
};

export default Home;
