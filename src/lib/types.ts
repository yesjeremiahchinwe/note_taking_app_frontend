
export interface Note {
    title: string,
    tags: string[],
    content: string,
    lastEdited: string,
    isArchived: boolean
    _id: string
    id: string
    userId: string
}

export interface MobileNavLink {
    text: string,
    path: string,
    isActive: boolean,
    Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}

export interface AuthFormProp {
    title: string,
    description: string,
    isLogin: boolean
}
