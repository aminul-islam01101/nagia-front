import OuterPage from '@/component/OuterPage';
import styles from '@/styles/blog.module.scss';
import blogPosts from '@/utils/blog';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Blog = ({ dataExport }) => {
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState([]);
  const [title, setTitle] = useState('');
  useEffect(() => {
    if (!router.isReady) return;
    blogPosts?.filter((post) => {
      if (post.id == id) {
        setContent(post.content);
        setTitle(post.title);
      }
    });
  }, [router.isReady, id]);

  // console.log(content);

  return (
    <OuterPage>
      <div className={`${styles.post} container`}>
        <h1>Blog Post</h1>
        <h2>{title}</h2>
        <div className={styles.content}>
          {content?.map((items, id) => {
            return <p key={id}>{items}</p>;
          })}
        </div>
      </div>
    </OuterPage>
  );
};

export default Blog;
