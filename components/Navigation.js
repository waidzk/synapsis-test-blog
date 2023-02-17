import Link from "next/link";
import { useRouter } from "next/router";
import style from "../styles/Navigation.module.css";

export default function Navigation() {
  const router = useRouter();

  return (
    <div id="navigation" className={style.navigation}>
      <ul className={style.nav_wrap_item}>
        <Link href={"/"}>
          <li
            className={
              router.pathname == "/" ? style.nav_item_active : style.nav_item
            }
          >
            Blogs
          </li>
        </Link>
        <Link href={"/users"}>
          <li
            className={
              router.pathname == "/users"
                ? style.nav_item_active
                : style.nav_item
            }
          >
            Users
          </li>
        </Link>
      </ul>
    </div>
  );
}
