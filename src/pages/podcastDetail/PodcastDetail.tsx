import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, dispatch } from "../../store";
import {fetchPodcastDetail} from "../../store/thunks";
import PodcastCard from "../../components/podcastCard";
import EpisodeList from "../../components/episodeList";

import styles from "./PodcastDetail.module.css";

const PodcastDetail = () => {
  const { podcastId } = useParams();
  const { podcastDetail } = useSelector((state: RootState) => state.podcastDetail);
  
  useEffect(() => {
    if (podcastId === undefined) return;
    dispatch(fetchPodcastDetail(podcastId));
  }, []);

  if (!podcastDetail) return null; // TODO : Add loading component

  const { image, title, author, summary } = podcastDetail;

  return (
    <div className={styles.container}>
      <PodcastCard image={image} title={title} author={author} summary={summary} />
      <EpisodeList episodes={podcastDetail.episodes} />
    </div>
  );
};

export default PodcastDetail;
