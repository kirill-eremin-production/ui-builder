import { FC } from 'react';

import { UiComponents } from '@/shared/types/UiComponents';

import { WidgetBox } from '@/Renderer/components/WidgetBox';
import { Container } from '@/Renderer/dist/components/Container';

export type UiNodeProps = {
    ui: UiComponents;
};

export const UiNode: FC<UiNodeProps> = ({ ui }) => {
    return (
        <div>
            {Object.entries(ui).map(([key, node]) => {
                if (node.type === 'Container') {
                    return (
                        <WidgetBox
                            isMoving={node.isMoving}
                            x={node.x}
                            y={node.y}
                            width={node.width}
                            height={node.height}
                            key={key}
                        >
                            <Container key={key} text={node.text}>
                                {node.children ? (
                                    <UiNode ui={node.children} />
                                ) : null}
                            </Container>
                        </WidgetBox>
                    );
                }
            })}
        </div>
    );
};
