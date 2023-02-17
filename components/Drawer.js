import style from "@/styles/Drawer.module.css";

export default function Drawer() {
  return (
    <div className={`${style.drawer} ${drawer ? style.drawer_open : ""}`}>
      <span onClick={handleCloseDrawer}>Close</span>
    </div>
  );
}
