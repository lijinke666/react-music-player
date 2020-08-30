import React from 'react'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'

export {
  FaBook as LyricIcon,
  FaHeadphones as FaHeadphonesIcon,
  FaRegMinusSquare as FaMinusSquareOIcon,
  FaSpinner as LoadIcon,
  FaSyncAlt as ReloadIcon,
} from 'react-icons/fa'
export { FiChevronsDown as ArrowDownIcon } from 'react-icons/fi'
export {
  GoMute as VolumeMuteIcon,
  GoUnmute as VolumeUnmuteIcon,
} from 'react-icons/go'
export {
  MdClose as CloseIcon,
  MdLibraryMusic as EmptyIcon,
  MdRepeat as RepeatIcon,
  MdRepeatOne as LoopIcon,
  MdSkipNext as NextAudioIcon,
  MdSkipPrevious as PrevAudioIcon,
  MdViewHeadline as OrderPlayIcon,
} from 'react-icons/md'
export {
  RiDeleteBinLine as DeleteIcon,
  RiPlayList2Fill as PlayListsIcon,
} from 'react-icons/ri'
export {
  TiArrowShuffle as ShufflePlayIcon,
  TiDownload as DownloadIcon,
} from 'react-icons/ti'

export const AnimatePlayIcon = () => (
  <FaPlayCircle className="react-jinke-music-player-play-icon" />
)
export const AnimatePauseIcon = () => (
  <FaPauseCircle className="react-jinke-music-player-pause-icon" />
)
