
import { ButtonMetadata } from "src/app/common/interfaces";
import { TraderRoutes } from "./tr-interfaces";

export const TRADER_NAV_BUTTONS: ButtonMetadata[] = [
    {url: TraderRoutes.DASHBOARD, text: 'dashboard'},
    {url: TraderRoutes.CHARTS, text: 'charts'},
    {url: TraderRoutes.PORTFOLIO, text: 'portfolio'},
    {url: TraderRoutes.TRADING, text: 'trading'},
    {url: TraderRoutes.DESIGN_SYSTEM, text: 'design-system'},
];