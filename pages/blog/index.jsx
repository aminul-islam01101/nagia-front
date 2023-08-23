import OuterPage from '@/component/OuterPage';
import styles from '@/styles/blog.module.scss';
import blogPosts from '@/utils/blog';
import Link from 'next/link';

const Blog = () => {
  return (
    <OuterPage>
      <div className={`${styles.blog} container`}>
        <h1>Blog Post</h1>
        <div className={styles.blog__posts}>
          {blogPosts.map((post) => (
            <div className={styles.blog__single} key={post.id}>
              <h2>{post.title}</h2>
              <p>
                {post.content[0]}
                <span>
                  <Link href={`blog/${post.id}`}> ...Read more</Link>
                </span>
              </p>
              <p>by </p>
            </div>
          ))}
        </div>
      </div>
    </OuterPage>
  );
};

export default Blog;
