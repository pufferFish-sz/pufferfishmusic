/* ==========================================================================
   VIDEO CONFIG — this is the ONLY file you need to edit to update videos.
   --------------------------------------------------------------------------
   Every video on the site is listed here once, with BOTH sources:

     yt:   the YouTube video ID — the part after "watch?v=" in the URL.
           e.g. https://www.youtube.com/watch?v=XRIHb_EnG3Y  ->  "XRIHb_EnG3Y"

     bili: the Bilibili BV id — the part starting with "BV" in the URL.
           e.g. https://www.bilibili.com/video/BV1xx411c7mD  ->  "BV1xx411c7mD"

   Values still starting with "YT_" or "BILI_" are placeholders — the page
   shows a tasteful "coming soon" panel for them until you fill them in.

   To ADD a new video: add an entry here, then drop this into any page:
     <div class="video-embed" data-video="your_key_here"></div>
   ========================================================================== */

const VIDEOS = {
  // Home — hero demo reel
  demoreel: {
    title: "Audio Demo Reel",
    yt: "YT_VIDEO_ID_DEMOREEL",
    bili: "BILI_BVID_DEMOREEL",
  },

  // Internships — Tencent, The Hidden Ones character redesign
  ruhua: {
    title: "Ruhua Redesign — The Hidden Ones",
    yt: "NvPBncXmLV8",
    bili: "BILI_BVID_RUHUA",
  },

  // Projects — UE5 environmental ambience walkthrough
  ambience: {
    title: "UE5 Environmental Ambience Walkthrough",
    yt: "BbBrQCV-NZo",
    bili: "BILI_BVID_AMBIENCE",
  },

  // Projects — VR interactive music & mech fighting game
  vr_mech: {
    title: "VR Interactive Music & Mech Fighting",
    yt: "QZswwaJoX_E",
    bili: "BILI_BVID_VR_MECH",
  },

  // Projects — audio-driven lip sync
  lip_sync: {
    title: "Audio-Driven Lip Sync",
    yt: "M32167uomg4",
    bili: "BILI_BVID_LIP_SYNC",
  },

  // Projects — Waves battleship simulator
  waves: {
    title: "Waves — 3D Battleship Simulator",
    yt: "07_PQdnouqA",
    bili: "BILI_BVID_WAVES",
  },

  // Contact — piano performance (YouTube ID carried over from the old site)
  chopin: {
    title: "Chopin Étude Op. 10 No. 1 — Shangyi Zhu",
    yt: "XRIHb_EnG3Y",
    bili: "BILI_BVID_CHOPIN",
  },
};
