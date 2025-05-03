import SectionWrappers from "@/components/wrappers/section-wrapper";
import Logo from "../logo/logo";

function Footer() {
  return (
    <SectionWrappers style="bg-gray-50 mt-14">
      <footer className="pt-12 md:pt-24 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
            <Logo />
            <p className="mt-4 text-sm text-muted-foreground">
              Discover and connect with active people who truly align with your
              niche.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-md font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
              <li>
                <a href="#">Blog</a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-md font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#">Help Center</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Legal</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-md font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: support@influencrin.com</li>
              <li>Phone: +880 1843 676171</li>
              <li>Location: Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 md:mt-24 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} InfluencrIn. All rights reserved.
        </div>
      </footer>
    </SectionWrappers>
  );
}

export default Footer;
