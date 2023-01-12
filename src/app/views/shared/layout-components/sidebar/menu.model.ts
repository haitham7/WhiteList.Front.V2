
export interface MenuItem {
  headTitle?: string,
	headTitle2?: string,
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeValue?: string;
	badgeClass? :string;
	active?: boolean;
	bookmark?: boolean;
	children?: MenuItem[];
	Menusub?: boolean;
	target?:boolean
}
