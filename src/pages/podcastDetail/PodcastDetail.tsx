import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchPodcastDetail } from "../../store/thunks";
import PodcastCard from "../../components/podcastCard";
import EpisodeList from "../../components/episodeList";
import { AnyAction } from "@reduxjs/toolkit";

import styles from "./PodcastDetail.module.css";


const PodcastDetail = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { podcastId } = useParams();
  const { podcastDetail } = useSelector(
    (state: RootState) => state.podcastDetail
  );
  const { loading } = useSelector((state: any) => state.global);

  useEffect(() => {
    if (!podcastId) return;
    dispatch(fetchPodcastDetail(podcastId)).then((res: AnyAction) => {
      if (res.error) { // Error de CORS (cors-anywhere.herokuapp)
        navigate("/"); 
      }
    });
  }, [podcastId]);

  if (!podcastDetail || !podcastId || loading) return null;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <PodcastCard {...podcastDetail} />
      </div>
      <EpisodeList podcastId={podcastId} episodes={podcastDetail.episodes} />
    </div>
  );
};

export default PodcastDetail;
