import { FC } from 'react';

import { UiComponents } from '@/shared/types/UiComponents';

import { WidgetBox } from '@/Renderer/components/WidgetBox';
import { Container } from '@/Renderer/dist/components/Container';
import { CustomHtml } from '@/Renderer/dist/components/CustomHtml';

export type UiNodeProps = {
    isRenderMode?: boolean;
    ui: UiComponents;
};

export const UiNode: FC<UiNodeProps> = ({ ui, isRenderMode }) => {
    return (
        <div>
            {Object.entries(ui).map(([key, node]) => {
                if (!node) {
                    return null;
                }

                return (
                    <WidgetBox
                        id={node.id}
                        isMoving={node.isMoving}
                        x={node.x}
                        y={node.y}
                        width={node.width}
                        height={node.height}
                        key={key}
                        isRenderMode={isRenderMode}
                    >
                        {node.type === 'Container' && (
                            <Container key={key} text={node.text}>
                                {node.children ? (
                                    <UiNode
                                        isRenderMode={true}
                                        ui={node.children}
                                    />
                                ) : null}
                            </Container>
                        )}

                        {node.type === 'CustomHTML' && (
                            <CustomHtml key={key} {...node.params} />
                        )}
                    </WidgetBox>
                );
            })}
        </div>
    );
};
