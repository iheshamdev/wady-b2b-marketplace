import {
  Bell,
  ChevronRight,
  CircleChevronLeft,
  CircleChevronRight,
  Earth,
  Globe,
  Heart,
  Image,
  ImageUp,
  LogOut,
  Logs,
  LucideIcon,
  LucideProps,
  MapPin,
  Menu,
  MessageCircleMore,
  MoveRight,
  Search,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Store,
  User,
  X,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  User,
  Heart,
  Image,
  Search,
  CircleChevronLeft,
  CircleChevronRight,
  Globe,
  ChevronRight,
  MoveRight,
  Menu,
  X,
  Settings,
  LogOut,
  Earth,
  ShoppingBag,
  Bell,
  MapPin,
  Logs,
  MessageCircleMore,
  Store,
  Logo: ({ ...props }: LucideProps) => (
    <svg
      width="46"
      height="46"
      viewBox="0 0 46 46"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5 0H46V11.5V34.5L34.5 46V11.5H0L11.5 0ZM0 37.9654V23H14.9654L0 37.9654ZM23 46H8.22887L23 31.2289V46Z"
      />
    </svg>
  ),
  Facebook: ({ ...props }: LucideProps) => (
    <svg
      width="9"
      height="16"
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.77205 9.2H7.67682L8.43872 6H5.77205V4.4C5.77205 3.576 5.77205 2.8 7.29586 2.8H8.43872V0.112C8.19034 0.0776001 7.25243 0 6.26196 0C4.19339 0 2.72444 1.3256 2.72444 3.76V6H0.438721V9.2H2.72444V16H5.77205V9.2Z"
        fill="#262626"
      />
    </svg>
  ),
  XTwitter: ({ ...props }: LucideProps) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.17553 6.00469L13.015 0.5H11.8681L7.66611 5.27953L4.30982 0.5H0.438721L5.51404 7.72759L0.438721 13.5H1.58565L6.02326 8.45265L9.56762 13.5H13.4387L8.17522 6.00469H8.17553ZM6.60471 7.79117L6.09041 7.0715L1.99885 1.3448H3.76044L7.06224 5.9665L7.57643 6.68617L11.8686 12.6936H10.1072L6.60471 7.79148V7.79117Z"
        fill="#262626"
      />
    </svg>
  ),
  Instagram: ({ ...props }: LucideProps) => (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.26113 0C10.1611 0.00239994 10.6179 0.00719983 11.0122 0.0183996L11.1674 0.0239994C11.3466 0.0303992 11.5234 0.038399 11.737 0.0479988C12.5882 0.0879978 13.1689 0.222395 13.6785 0.41999C14.2065 0.623185 14.6513 0.898378 15.096 1.34237C15.503 1.74214 15.8177 2.22592 16.0184 2.75993C16.216 3.26952 16.3504 3.85031 16.3904 4.70229C16.4 4.91508 16.408 5.09188 16.4144 5.27187L16.4192 5.42707C16.4312 5.82066 16.436 6.27745 16.4376 7.17743L16.4384 7.77421V8.82219C16.4403 9.4057 16.4342 9.9892 16.42 10.5725L16.4152 10.7277C16.4088 10.9077 16.4008 11.0845 16.3912 11.2973C16.3512 12.1493 16.2152 12.7293 16.0184 13.2397C15.8177 13.7737 15.503 14.2575 15.096 14.6572C14.6963 15.0642 14.2125 15.379 13.6785 15.5796C13.1689 15.7772 12.5882 15.9116 11.737 15.9516L11.1674 15.9756L11.0122 15.9804C10.6179 15.9916 10.1611 15.9972 9.26113 15.9988L8.66436 15.9996H7.61721C7.03345 16.0017 6.44969 15.9955 5.8661 15.9812L5.71091 15.9764C5.52101 15.9692 5.33115 15.961 5.14134 15.9516C4.29018 15.9116 3.70941 15.7772 3.19904 15.5796C2.66533 15.3789 2.18184 15.0641 1.78231 14.6572C1.37508 14.2575 1.06003 13.7738 0.859155 13.2397C0.661565 12.7301 0.527171 12.1493 0.487173 11.2973L0.463174 10.7277L0.459175 10.5725C0.444428 9.98921 0.437761 9.4057 0.439176 8.82219V7.17743C0.436962 6.59392 0.442829 6.01041 0.456775 5.42707L0.462375 5.27187C0.468774 5.09188 0.476774 4.91508 0.486373 4.70229C0.526371 3.85031 0.660765 3.27032 0.858355 2.75993C1.0597 2.2257 1.37531 1.74191 1.78311 1.34237C2.18241 0.935617 2.66561 0.620844 3.19904 0.41999C3.70941 0.222395 4.28938 0.0879978 5.14134 0.0479988C5.35413 0.038399 5.53172 0.0303992 5.71091 0.0239994L5.8661 0.0191995C6.44943 0.00498604 7.03292 -0.00114773 7.61641 0.000799923L9.26113 0ZM8.43877 3.9999C7.37796 3.9999 6.3606 4.42132 5.61049 5.17145C4.86038 5.92158 4.43897 6.93897 4.43897 7.99981C4.43897 9.06065 4.86038 10.078 5.61049 10.8282C6.3606 11.5783 7.37796 11.9997 8.43877 11.9997C9.49958 11.9997 10.5169 11.5783 11.2671 10.8282C12.0172 10.078 12.4386 9.06065 12.4386 7.99981C12.4386 6.93897 12.0172 5.92158 11.2671 5.17145C10.5169 4.42132 9.49958 3.9999 8.43877 3.9999ZM8.43877 5.59986C8.75393 5.59981 9.06601 5.66184 9.3572 5.7824C9.64838 5.90296 9.91297 6.07969 10.1359 6.30251C10.3587 6.52533 10.5356 6.78987 10.6562 7.08102C10.7769 7.37217 10.839 7.68424 10.8391 7.99941C10.8391 8.31457 10.7771 8.62666 10.6565 8.91786C10.536 9.20905 10.3592 9.47365 10.1364 9.69654C9.91361 9.91943 9.64908 10.0963 9.35794 10.2169C9.06679 10.3376 8.75473 10.3997 8.43957 10.3997C7.80308 10.3997 7.19267 10.1469 6.7426 9.69682C6.29254 9.24675 6.03969 8.63631 6.03969 7.99981C6.03969 7.3633 6.29254 6.75287 6.7426 6.30279C7.19267 5.85271 7.80308 5.59986 8.43957 5.59986M12.6394 2.79993C12.3742 2.79993 12.1198 2.90529 11.9323 3.09282C11.7448 3.28035 11.6394 3.5347 11.6394 3.79991C11.6394 4.06512 11.7448 4.31947 11.9323 4.507C12.1198 4.69453 12.3742 4.79988 12.6394 4.79988C12.9046 4.79988 13.1589 4.69453 13.3464 4.507C13.534 4.31947 13.6393 4.06512 13.6393 3.79991C13.6393 3.5347 13.534 3.28035 13.3464 3.09282C13.1589 2.90529 12.9046 2.79993 12.6394 2.79993Z"
        fill="#262626"
      />
    </svg>
  ),
};
