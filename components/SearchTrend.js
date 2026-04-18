
import styles from '../styles/Trends.module.css'
import {useState} from 'react';
import {useRouter} from 'next/router';



export default function SearchTrend(props) {
    const router = useRouter();
    const placehold = '#' + props.hashtagName;
    const [search, setSearch] = useState('');

    const handleChange = (e) => setSearch(e.target.value)
  return (
    <>
    <section>
    <form className={styles.searchContainer}
        onSubmit={(e) => {
          e.preventDefault(); // <-- prevent the default form action
          const cleanWord = search.replace('#', '');
           props.changeSlug(cleanWord);
           router.push(`/hashtags/${cleanWord}`);
        }}
      >
        <input className={styles.searchtags}
          key="searchBox"
          type="text"
          value={search}
          placeholder={placehold}
          onChange={(event) => handleChange(event)}
        />
      </form>
      </section>
    </>
  )
}