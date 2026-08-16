export interface IProfileResp {
	intro: IIntro;
	summary?: string;
	projects: IProject[];
	contributions: IContribution[];
	experiences: IExperience[];
	educations: IEducation[];
	achievements: IAchievement[];
	resumeUrl: {
		sourceLink: string;
		fullVersionLink: string;
	};
}

export interface IContribution {
	name: string;
	details: string[];
	url: string;
	hide: boolean;
}

export interface IAchievement {
	title: string;
	link: string;
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

export interface IExperience {
	position: string;
	company: string;
	location?: string;
	url: string;
	years: string[];
	details: string[];
	hide?: boolean;
}

export interface IEducation {
	degree: string;
	school: string;
	location?: string;
	years?: string;
	gpa?: string;
}
