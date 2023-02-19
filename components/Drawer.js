import style from "@/styles/Drawer.module.css";

export default function Drawer({isOpen, children}) {
  return (
    <div className={`${style.drawer} ${isOpen ? style.drawer_open : ""}`}>
      {children}
    </div>
  );
}
