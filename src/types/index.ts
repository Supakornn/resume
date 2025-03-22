
export interface IProfileResp {
	intro: IIntro;
	projects: IProject[];
	technologies: ITechnology[];
	experiences: IExperience[];
	educations: IEducation[];
	achievements: string[];
	resumeUrl: {
		sourceLink: string;
		fullVersionLink: string;
	};
}
export interface IIntro {
	name: string;
	nickname: string;
	phone: string;
	email: string;
	github: string;
	linkedin: string;
	location: string;
	website: string;
}

export interface IProject {
	name: string;
	details: string[];
	url: string;
	hide: boolean;
}

export interface ITechnology {
	section: string;
	details: string;
}

export interface IExperience {
	position: string;
	company: string;
	url: string;
	years: string[];
	details: string[];
}

export interface IEducation {
	head: string;
	details: string;
}
