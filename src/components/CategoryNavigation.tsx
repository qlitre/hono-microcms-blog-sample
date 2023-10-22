import NextLink from "next/link";
import type { PostCategory } from "types/blog";

import styles from "styles/components/shared/CategoryNavigation.module.scss";


type Props = {
    categories: PostCategory[];
    activeCategoryId?: string
}

export const CategoryNavigation = ({ categories, activeCategoryId }: Props) => {
    return (
        <nav className={styles.categoryNavigation}>
            {categories.map(category => (
                <NavigationLink
                    href={`/${category.id}/page/1`}
                    categoryId={category.id}
                    activeCategoryId={activeCategoryId}
                    key={category.id}>
                    {category.name}
                </NavigationLink>
            ))}
        </nav>
    );
};

type ChildProps = {
    href: string;
    children: string;
    categoryId: string;
    activeCategoryId?: string;
}

const NavigationLink = ({ href, children, categoryId, activeCategoryId }: ChildProps) => {
    const isActive = categoryId === activeCategoryId;
    if (isActive) {
        return (
            <NextLink className={styles.categoryLinkActive} href={href} passHref>
                {children}
            </NextLink>
        );
    }
    return (
        <NextLink className={styles.categoryLink} href={href} passHref>
            {children}
        </NextLink>
    );
};