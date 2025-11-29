
export interface Note {
    title: string,
    tags: string,
    content: string,
    updatedAt: string,
    isArchived: boolean
    _id: string
    user: string
}

export interface MobileNavLink {
    text: string,
    path: string,
    isActive: boolean,
    Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}
