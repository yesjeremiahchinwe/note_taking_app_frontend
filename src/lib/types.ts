
export interface Note {
    title: string,
    tags: string[],
    content: string,
    lastEdited: string,
    isArchived: boolean
}

export interface MobileNavLink {
    text: string,
    path: string,
    isActive: boolean,
    Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element

}
