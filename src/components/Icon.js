import React from 'react'
import { FaPlayCircle, FaPauseCircle } from 'react-icons/fa'

export {
  FaHeadphones as FaHeadphonesIcon,
  FaMinusSquare as FaMinusSquareOIcon,
  FaBook as LyricIcon,
  FaSyncAlt as ReloadIcon,
  FaCloudDownloadAlt as DownloadIcon,
  FaSpinner as LoadIcon,
  FaTrashAlt as DeleteIcon,
  FaAngleDoubleDown as ArrowDownIcon,
} from 'react-icons/fa'

export {
  MdVolumeUp as MdVolumeDownIcon,
  MdVolumeMute as MdVolumeMuteIcon,
  MdRepeatOne as LoopIcon,
  MdRepeat as RepeatIcon,
  MdSkipNext as NextAudioIcon,
  MdSkipPrevious as PrevAudioIcon,
  MdViewHeadline as OrderPlayIcon,
  MdQueueMusic as PlayListsIcon,
  MdClose as CloseIcon,
  MdLibraryMusic as NotContentIcon,
} from 'react-icons/md'

export { TiArrowShuffle as ShufflePlayIcon } from 'react-icons/ti'

export const AnimatePlayIcon = () => (
  <FaPlayCircle className="react-jinke-music-player-play-icon" />
)
export const AnimatePauseIcon = () => (
  <FaPauseCircle className="react-jinke-music-player-pause-icon" />
)
